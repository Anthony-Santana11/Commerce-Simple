package com.anthony.commercesimple.UseCases;


import com.anthony.commercesimple.Entity.UserEntity;
import com.anthony.commercesimple.Enums.Role;
import com.anthony.commercesimple.Exceptions.UserAlredyExists;
import com.anthony.commercesimple.Repository.RegisterUserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class RegisterUserUseCase {

    @Autowired
    private RegisterUserRepository registerUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserEntity execute(
            String username,
            String email,
            String password,
            String name,
            Role role
    ) {

        // Verifica se o usuário já existe
        boolean userExists = registerUserRepository.existsUserByUsernameOrEmail(username, email);
        if (userExists) {
            throw new UserAlredyExists();
        }

        // Criptografa a senha
        String encodedPassword = passwordEncoder.encode(password);

        // Cria a nova entidade de usuário
        UserEntity newUser = new UserEntity();
        newUser.setName(name);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setRole(role);

        // Salva o usuário no banco
        UserEntity savedUser = registerUserRepository.save(newUser);

        // Exibe o ID gerado
        System.out.println(">>> Usuário salvo com ID: " + savedUser.getUserId());

        return savedUser;
    }

}
