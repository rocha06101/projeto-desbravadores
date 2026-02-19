namespace projeto.desbravadores.Domain.Users;

public sealed class User
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Email { get; private set; } = string.Empty;
    public string DisplayName { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public List<string> Roles { get; private set; } = [];

    private User() { }  

    public User(string email, string displayName, string passwordHash)
    {
        Email = email;
        DisplayName = displayName;
        PasswordHash = passwordHash;
        Roles.Add("User");
    }

}
