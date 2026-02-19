namespace projeto.desbravadores.Application.Auth;

public interface IAuthService
{
    Task<TokenResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken);
}
