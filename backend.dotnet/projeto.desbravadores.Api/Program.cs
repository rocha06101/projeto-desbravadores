using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using projeto.desbravadores.Application.Auth;
using projeto.desbravadores.Application.Users;
using projeto.desbravadores.Infrastructure.Auth;
using projeto.desbravadores.Infrastructure.Users;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Bind Jwt options
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));

// Jwt Auth
var jwt = builder.Configuration.GetSection("Jwt").Get<JwtOptions>()!;


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.SigningKey)),
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization();

// DI do auth
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();

//Apagar essa gambiarra ao final do teste.
//Criado apenas para evitar o erro de injeção de dependência,
//já que a autenticação depende de um repositório de usuários, e ainda não temos um banco de dados real.
builder.Services.AddScoped<IUserRepository, InMemoryUserRepository>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
