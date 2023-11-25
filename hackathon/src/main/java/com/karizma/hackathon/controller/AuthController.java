package com.karizma.hackathon.controller;


import com.auth0.jwt.interfaces.DecodedJWT;
import com.karizma.hackathon.common.CoreConstant;
import com.karizma.hackathon.dto.JwtToken;
import com.karizma.hackathon.dto.JwtTokenResponseDto;
import com.karizma.hackathon.dto.UserDto;
import com.karizma.hackathon.dto.UserLoginDto;
import com.karizma.hackathon.exception.BusinessException;
import com.karizma.hackathon.exception.ElementAlreadyExistsException;
import com.karizma.hackathon.exception.ElementNotFoundException;
import com.karizma.hackathon.exception.UnauthorizedException;
import com.karizma.hackathon.model.GenericEnum;
import com.karizma.hackathon.model.User;
import com.karizma.hackathon.service.UserService;
import com.karizma.hackathon.utils.JwtProvider;
import com.karizma.hackathon.utils.MapHelper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    private final MapHelper mapHelper;

    public AuthController(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserService userService, MapHelper mapHelper) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userService = userService;
        this.mapHelper = mapHelper;
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> saveUser(@RequestBody @Valid UserDto userDto, HttpServletRequest request)
            throws ElementAlreadyExistsException {
        User convertedUser = mapHelper.convertToEntity(userDto, User.class);

        User savedUser = userService.save(convertedUser);

        return ResponseEntity.ok().body(mapHelper.convertToDto(savedUser, UserDto.class));
    }


    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponseDto> login(@Valid @RequestBody UserLoginDto userLoginDto)
            throws UnauthorizedException, ElementNotFoundException {

        Authentication authToken =
                new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());

        Authentication authResult;

        try {
            authResult = authenticationManager.authenticate(authToken);
        } catch (org.springframework.security.core.AuthenticationException e) {
            throw new UnauthorizedException(null, e.getCause(), CoreConstant.Exception.AUTHENTICATION_BAD_CREDENTIALS, null);
        }

        User authenticatedUser = (User) authResult.getPrincipal();

        JwtToken accessToken = jwtProvider.generateToken(authenticatedUser, GenericEnum.JwtTokenType.ACCESS);
        JwtToken refreshToken = jwtProvider.generateToken(authenticatedUser, GenericEnum.JwtTokenType.REFRESH);
        String refreshTokenId = jwtProvider.getDecodedJWT(refreshToken.getToken(), GenericEnum.JwtTokenType.REFRESH).getId();

        User connectedUser = userService.findById(authenticatedUser.getId());
        connectedUser.setRefreshTokenId(refreshTokenId);
        userService.update(connectedUser.getId(), connectedUser);
        return ResponseEntity
                .ok()
                .body(
                        JwtTokenResponseDto.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build()
                );
    }

    @PostMapping("/token")
    public ResponseEntity<JwtTokenResponseDto> refreshToken(HttpServletRequest request) throws BusinessException {

        String refreshToken = jwtProvider.extractTokenFromRequest(request);

        DecodedJWT decodedRefreshToken = jwtProvider.getDecodedJWT(refreshToken, GenericEnum.JwtTokenType.REFRESH);
        Long userId = Long.valueOf(decodedRefreshToken.getSubject());
        String refreshTokenId = decodedRefreshToken.getId();

        User user = userService.findById(userId);

        try {
            if (!refreshTokenId.equals(user.getRefreshTokenId()))
                throw new UnauthorizedException(null, new UnauthorizedException(), CoreConstant.Exception.AUTHORIZATION_INVALID_TOKEN, null);
        } catch (NullPointerException e) {
            throw new BusinessException(e.getMessage(), e.getCause(), null, null);
        }

        JwtToken newAccessToken = jwtProvider.generateToken(user, GenericEnum.JwtTokenType.ACCESS);
        JwtToken newRefreshToken = jwtProvider.generateToken(user, GenericEnum.JwtTokenType.REFRESH);

        user.setRefreshTokenId(jwtProvider.getDecodedJWT(newRefreshToken.getToken(), GenericEnum.JwtTokenType.REFRESH).getId());
        userService.update(userId, user);

        return ResponseEntity
                .ok()
                .body(
                        JwtTokenResponseDto.builder()
                                .accessToken(newAccessToken)
                                .refreshToken(newRefreshToken)
                                .build()
                );
    }

}
