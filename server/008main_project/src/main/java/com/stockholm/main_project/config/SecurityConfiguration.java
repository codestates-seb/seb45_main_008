package com.stockholm.main_project.config;

import com.stockholm.main_project.auth.filter.JwtAuthenticationFilter;
import com.stockholm.main_project.auth.filter.JwtVerificationFilter;
import com.stockholm.main_project.auth.handler.MemberAuthenticationFailureHandler;
import com.stockholm.main_project.auth.handler.MemberAuthenticationSuccessHandler;
import com.stockholm.main_project.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.stockholm.main_project.auth.jwt.JwtTokenizer;
import com.stockholm.main_project.auth.utils.CustomAuthorityUtils;
import com.stockholm.main_project.auth.utils.OAuth2MemberService;
import com.stockholm.main_project.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    @Autowired
    public final OAuth2MemberService oAuth2MemberService;

    private final MemberService memberService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, OAuth2MemberService oAuth2MemberService, @Lazy MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.oAuth2MemberService = oAuth2MemberService;
        this.memberService = memberService;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().sameOrigin() //H2 웹 콘솔에 정상적으로 접근 가능하도록 설정
                .and()
                .cors().configurationSource(corsConfigurationSource())// CORS 설정을 추가
                .and()
                .csrf().disable() //CSRF 공격에 대한 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)를 통해서 세션을 생성하지 않도록 설정
                .and()
                .formLogin().disable() // JSON 포맷 전달 방식 사용을 위해 비활성화
                .httpBasic().disable() // request 전송마다 로그인 정보를 받지 않을 것임으로 비활성화
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("members/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/cash").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/cash/{cashId}").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/cash").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/stockorders").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/api/boards").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/api/boards/{boardId}").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/api/boards/{boardId}").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "api/boards").permitAll()
                        .antMatchers(HttpMethod.GET, "api/boards/{boardId}").permitAll() //질문을 선택해 조회하는 기능은 인증된 사용자에게만 혀용
                        .antMatchers(HttpMethod.POST, "/api/boards/{boardId}/comment").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/api/boards/{boardId}/comment/{commentId}").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/api/boards/{boardId}/comment/{commentId}").hasRole("USER")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint()
                        .userService(oAuth2MemberService)
                        .and()
                        .successHandler(new OAuth2AuthenticationSuccessHandler(jwtTokenizer, authorityUtils))
                );

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(List.of(
                "http://seb008stockholm.s3-website.ap-northeast-2.amazonaws.com/",
                "http://localhost:5173", "http://localhost:3000"
        ));
        configuration.setAllowedMethods(List.of("GET","POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            builder.addFilter(jwtAuthenticationFilter);

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, memberService);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
