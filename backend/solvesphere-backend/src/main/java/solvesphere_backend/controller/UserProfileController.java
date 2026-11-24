
package solvesphere_backend.controller;

import solvesphere_backend.dto.UserProfileResponse;
import solvesphere_backend.service.UserProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getMyProfile(
            Authentication authentication) {

        UserProfileResponse response =
                userProfileService.getProfileByEmail(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }
}
