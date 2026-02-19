using projeto.desbravadores.Application.Users;
using projeto.desbravadores.Domain.Users;

namespace projeto.desbravadores.Infrastructure.Users;

//Classe fake criada para subir a autenticação, sem a necessidade de um banco de dados real. (apagar isso depois)
public sealed class InMemoryUserRepository : IUserRepository
{
    private static readonly List<User> Users = [
        new User(
                email: "amin@admin.teste.com.br",
                displayName: "Admin",
                passwordHash: BCrypt.Net.BCrypt.HashPassword("1234as")
            )
    ];

    public Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
    {
        User? user = Users.FirstOrDefault(u =>
            u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

        return Task.FromResult(user);
    }
}
