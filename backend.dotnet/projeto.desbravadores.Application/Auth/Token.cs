namespace projeto.desbravadores.Application.Auth;

public interface ITokenService
{
    TokenResponse GenerateTokens(UserTokenData user);
}

public sealed record UserTokenData(
        Guid UserId,
        string Email,
        string DisplayName,
        IReadOnlyCollection<string> Roles
    );