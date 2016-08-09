const UNIX_JAVA_TIMESTAMP_FACTOR = 1000;

export function javaToUnixTimestamp(javaTimestamp) {
  return javaTimestamp * UNIX_JAVA_TIMESTAMP_FACTOR;
}

export function unixToJavaTimestamp(unixTimestamp) {
  return unixTimestamp / UNIX_JAVA_TIMESTAMP_FACTOR;
}
