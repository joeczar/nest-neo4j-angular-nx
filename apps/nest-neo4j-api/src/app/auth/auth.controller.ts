import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard'; // Custom Guard not shown, it would use Passport's local strategy
import { AuthService } from './auth.service';
import { JwtAccessToken } from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Guard will run the local strategy which validates the user
  @Post('login')
  async login(@Request() req): Promise<JwtAccessToken> {
    // Update the return type to JwtAccessToken
    return this.authService.login(req.user);
  }

  // Add the logout logic
}
