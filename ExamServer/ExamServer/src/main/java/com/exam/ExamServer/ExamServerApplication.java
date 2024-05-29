package com.exam.ExamServer;

import com.exam.ExamServer.model.Role;
import com.exam.ExamServer.model.User;
import com.exam.ExamServer.model.UserRole;
import com.exam.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.HashSet;
import java.util.Set;

 @SpringBootApplication
//@EnableAutoConfiguration(exclude = {BatchAutoConfiguration.class})
public class ExamServerApplication implements CommandLineRunner{

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {

		SpringApplication.run(ExamServerApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code");

		// User user=new User();

		// user.setUsername("lone");
		// user.setFirstName("Sourabh");
		// user.setLastName("Potfode");
		// user.setEmail("sourabh@gmail.com");
		// user.setPhone("8321245909");
		// user.setProfile("default.png");
		// user.setPassword(this.bCryptPasswordEncoder.encode("lone"));

		// Role role=new Role();
		// role.setRoleId(45L);;
		// role.setRoleName("Admin");

		// UserRole userRole=new UserRole();
		// userRole.setRole(role);
		// userRole.setUser(user);


		// Set<UserRole> userRoleSet=new HashSet<>();
		// userRoleSet.add(userRole);

		// User newUser=this.userService.createUser(user,userRoleSet);

		// System.out.println(newUser.getUsername());
	}
}
