import java.util.Map;

import org.lorecraft.phparser.SerializedPhpParser;


public class test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String input = "a:2:{s:4:\"tags\";s:6:\"golden\";s:4:\"user\";s:3:\"760\";}";
		SerializedPhpParser serializedPhpParser = new SerializedPhpParser(input);
		Object result = serializedPhpParser.parse();
		Map<Object, Object> res = (Map<Object, Object>) result;
		
		System.out.println(res.get("tags"));
	}

}
