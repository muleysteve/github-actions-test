package essar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for {@link SimpleClass}.
 */
public class SimpleClassTests
{
	
	@Test
	public void testSayHello() {

		SimpleClass underTest = new SimpleClass();
		assertEquals("Hello there!", underTest.sayHello(), "Should be saying hello");

	}
}