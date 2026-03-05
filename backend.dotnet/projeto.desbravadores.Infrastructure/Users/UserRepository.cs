using Microsoft.EntityFrameworkCore;
using projeto.desbravadores.Application.Users;
using projeto.desbravadores.Domain.Users;
using projeto.desbravadores.Infrastructure.Persistence;

namespace projeto.desbravadores.Infrastructure.Users;

public class UserRepository(
    DesbravadoresDbContext context
    ) : IUserRepository
{
    public async Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
        => await context.Users.FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

    public async Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken)
        => await context.Users.FindAsync(userId, cancellationToken).AsTask();

    public async Task CreateNewUser(string email, string password, CancellationToken cancellationToken)
    {
        await context.Users.AddAsync(new User(email, string.Empty, password), cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }


}
