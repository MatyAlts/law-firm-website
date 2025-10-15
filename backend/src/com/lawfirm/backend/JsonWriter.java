package com.lawfirm.backend;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

public final class JsonWriter {
  private JsonWriter() {}

  public static String toJson(Object value) {
    StringBuilder sb = new StringBuilder();
    appendValue(sb, value);
    return sb.toString();
  }

  @SuppressWarnings("unchecked")
  private static void appendValue(StringBuilder sb, Object value) {
    if (value == null) {
      sb.append("null");
    } else if (value instanceof String str) {
      appendString(sb, str);
    } else if (value instanceof Number || value instanceof Boolean) {
      sb.append(value.toString());
    } else if (value instanceof Map<?, ?> map) {
      sb.append('{');
      Iterator<? extends Map.Entry<?, ?>> iterator = map.entrySet().iterator();
      while (iterator.hasNext()) {
        Map.Entry<?, ?> entry = iterator.next();
        appendString(sb, String.valueOf(entry.getKey()));
        sb.append(':');
        appendValue(sb, entry.getValue());
        if (iterator.hasNext()) {
          sb.append(',');
        }
      }
      sb.append('}');
    } else if (value instanceof List<?> list) {
      sb.append('[');
      for (int i = 0; i < list.size(); i++) {
        if (i > 0) {
          sb.append(',');
        }
        appendValue(sb, list.get(i));
      }
      sb.append(']');
    } else {
      appendString(sb, value.toString());
    }
  }

  private static void appendString(StringBuilder sb, String value) {
    sb.append('"');
    for (int i = 0; i < value.length(); i++) {
      char ch = value.charAt(i);
      switch (ch) {
        case '\\':
          sb.append("\\\\");
          break;
        case '"':
          sb.append("\\\"");
          break;
        case '\b':
          sb.append("\\b");
          break;
        case '\f':
          sb.append("\\f");
          break;
        case '\n':
          sb.append("\\n");
          break;
        case '\r':
          sb.append("\\r");
          break;
        case '\t':
          sb.append("\\t");
          break;
        default:
          if (ch < 0x20) {
            sb.append(String.format("\\u%04x", (int) ch));
          } else {
            sb.append(ch);
          }
      }
    }
    sb.append('"');
  }
}
