package com.caixiaohu.config;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProductionSecurityConfigTest {
	@Test
	void productionUsesSecureLoginDefaultsAndDisablesDebugLogging() throws IOException {
		Properties properties = new Properties();
		try (InputStream input = getClass().getResourceAsStream("/application-prd.properties")) {
			properties.load(input);
		}

		assertEquals("5", properties.getProperty("security.login-limit.account-max-failures"));
		assertEquals("20", properties.getProperty("security.login-limit.ip-max-failures"));
		assertEquals("900", properties.getProperty("security.login-limit.window-seconds"));
		assertEquals("info", properties.getProperty("logging.level.com.caixiaohu"));
	}
}
