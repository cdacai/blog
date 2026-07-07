package top.naccl;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.caixiaohu.BlogApiApplication;
import com.caixiaohu.service.BlogService;

@SpringBootTest(classes = BlogApiApplication.class)
class BlogApiApplicationTests {
	@MockBean
	private BlogService blogService;

	@Test
	void contextLoads() {
	}

	@Test
	void test() {
	}

}
