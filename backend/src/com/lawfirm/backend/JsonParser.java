package com.lawfirm.backend;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class JsonParser {
  private final String input;
  private int index;

  private JsonParser(String input) {
    this.input = input;
    this.index = 0;
  }

  public static Object parse(String json) {
    if (json == null) {
      throw new IllegalArgumentException("JSON input cannot be null");
    }
    JsonParser parser = new JsonParser(json);
    Object value = parser.parseValue();
    parser.skipWhitespace();
    if (!parser.isEnd()) {
      throw new IllegalArgumentException("Unexpected characters after JSON payload");
    }
    return value;
  }

  @SuppressWarnings("unchecked")
  public static Map<String, Object> parseObject(String json) {
    Object value = parse(json);
    if (!(value instanceof Map)) {
      throw new IllegalArgumentException("Expected JSON object");
    }
    return (Map<String, Object>) value;
  }

  private Object parseValue() {
    skipWhitespace();
    if (isEnd()) {
      throw new IllegalArgumentException("Unexpected end of JSON input");
    }
    char ch = input.charAt(index);
    switch (ch) {
      case '"':
        return parseString();
      case '{':
        return parseObject();
      case '[':
        return parseArray();
      case 't':
        return parseLiteral("true", Boolean.TRUE);
      case 'f':
        return parseLiteral("false", Boolean.FALSE);
      case 'n':
        return parseLiteral("null", null);
      default:
        return parseNumber();
    }
  }

  private Map<String, Object> parseObject() {
    expect('{');
    Map<String, Object> map = new LinkedHashMap<>();
    skipWhitespace();
    if (peek('}')) {
      expect('}');
      return map;
    }
    while (true) {
      skipWhitespace();
      String key = parseString();
      skipWhitespace();
      expect(':');
      Object value = parseValue();
      map.put(key, value);
      skipWhitespace();
      if (peek('}')) {
        expect('}');
        break;
      }
      expect(',');
    }
    return map;
  }

  private List<Object> parseArray() {
    expect('[');
    List<Object> list = new ArrayList<>();
    skipWhitespace();
    if (peek(']')) {
      expect(']');
      return list;
    }
    while (true) {
      Object value = parseValue();
      list.add(value);
      skipWhitespace();
      if (peek(']')) {
        expect(']');
        break;
      }
      expect(',');
    }
    return list;
  }

  private Object parseLiteral(String literal, Object value) {
    if (input.regionMatches(index, literal, 0, literal.length())) {
      index += literal.length();
      return value;
    }
    throw new IllegalArgumentException("Invalid token, expected " + literal);
  }

  private Number parseNumber() {
    int start = index;
    char ch = input.charAt(index);
    if (ch == '-') {
      index++;
    }
    index = consumeDigits(index);
    if (index < input.length() && input.charAt(index) == '.') {
      index++;
      index = consumeDigits(index);
    }
    if (index < input.length()) {
      ch = input.charAt(index);
      if (ch == 'e' || ch == 'E') {
        index++;
        if (index < input.length()) {
          ch = input.charAt(index);
          if (ch == '+' || ch == '-') {
            index++;
          }
        }
        index = consumeDigits(index);
      }
    }
    String number = input.substring(start, index);
    if (number.indexOf('.') >= 0 || number.indexOf('e') >= 0 || number.indexOf('E') >= 0) {
      return Double.parseDouble(number);
    }
    try {
      return Long.parseLong(number);
    } catch (NumberFormatException ex) {
      return Double.parseDouble(number);
    }
  }

  private int consumeDigits(int pos) {
    while (pos < input.length()) {
      char ch = input.charAt(pos);
      if (ch < '0' || ch > '9') {
        break;
      }
      pos++;
    }
    if (pos == index || (pos == index + 1 && input.charAt(index) == '-')) {
      throw new IllegalArgumentException("Invalid number");
    }
    return pos;
  }

  private String parseString() {
    expect('"');
    StringBuilder sb = new StringBuilder();
    while (!isEnd()) {
      char ch = input.charAt(index++);
      if (ch == '"') {
        return sb.toString();
      }
      if (ch == '\\') {
        if (isEnd()) {
          throw new IllegalArgumentException("Invalid escape sequence");
        }
        char esc = input.charAt(index++);
        switch (esc) {
          case '"':
            sb.append('"');
            break;
          case '\\':
            sb.append('\\');
            break;
          case '/':
            sb.append('/');
            break;
          case 'b':
            sb.append('\b');
            break;
          case 'f':
            sb.append('\f');
            break;
          case 'n':
            sb.append('\n');
            break;
          case 'r':
            sb.append('\r');
            break;
          case 't':
            sb.append('\t');
            break;
          case 'u':
            sb.append(parseUnicode());
            break;
          default:
            throw new IllegalArgumentException("Invalid escape sequence: \\" + esc);
        }
      } else {
        sb.append(ch);
      }
    }
    throw new IllegalArgumentException("Unterminated string literal");
  }

  private char parseUnicode() {
    if (index + 4 > input.length()) {
      throw new IllegalArgumentException("Invalid unicode escape");
    }
    int codePoint = 0;
    for (int i = 0; i < 4; i++) {
      char ch = input.charAt(index++);
      codePoint <<= 4;
      if (ch >= '0' && ch <= '9') {
        codePoint += ch - '0';
      } else if (ch >= 'a' && ch <= 'f') {
        codePoint += 10 + (ch - 'a');
      } else if (ch >= 'A' && ch <= 'F') {
        codePoint += 10 + (ch - 'A');
      } else {
        throw new IllegalArgumentException("Invalid unicode escape");
      }
    }
    return (char) codePoint;
  }

  private void expect(char expected) {
    skipWhitespace();
    if (isEnd() || input.charAt(index) != expected) {
      throw new IllegalArgumentException("Expected '" + expected + "'");
    }
    index++;
  }

  private boolean peek(char ch) {
    skipWhitespace();
    return !isEnd() && input.charAt(index) == ch;
  }

  private void skipWhitespace() {
    while (!isEnd()) {
      char ch = input.charAt(index);
      if (ch == ' ' || ch == '\n' || ch == '\r' || ch == '\t') {
        index++;
      } else {
        break;
      }
    }
  }

  private boolean isEnd() {
    return index >= input.length();
  }
}
