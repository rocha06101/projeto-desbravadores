using Microsoft.AspNetCore.Mvc;
using projeto.desbravadores.Application.Auth;
using System.Security.Claims;

namespace projeto.desbravadores.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController(IAuthService authService) 
    : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<TokenResponse>> Login([FromBody] LoginRequest request, 
        CancellationToken cancellationToken)
    {
        var tokens = await authService.LoginAsync(request, cancellationToken);
        return Ok(tokens);
    }
    [HttpGet("me")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public IActionResult Me()
    {
        return Ok(new
        {
            User = User.Identity?.Name,
            Claim = User.Claims.Select(c => new { c.Type, c.Value })
        });
    }
}
