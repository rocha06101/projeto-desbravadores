using projeto.desbravadores.Application.Auth;
using projeto.desbravadores.Application.Users;

namespace projeto.desbravadores.Infrastructure.Auth;

public sealed class AuthService(IUserRepository userRepository,
    ITokenService tokenService)
         : IAuthService 
{
    public async Task<TokenResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await userRepository.FindByEmailAsync(request.Email, cancellationToken);

        if (user is null)
            throw new UnauthorizedAccessException("Credenciais inválidas.");

        bool ok = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

        if (!ok)
            throw new UnauthorizedAccessException("Credenciais inválidas.");

        var userData = new UserTokenData(UserId: user.Id, Email: user.Email, DisplayName: user.DisplayName, Roles: user.Roles);

        return tokenService.GenerateTokens(userData);
    }
}
