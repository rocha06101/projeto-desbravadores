# 🚀 Projeto Desbravadores - Fontend
> Preencher depois
--- 
# 🚀 Projeto Desbravadores - Backend

Backend da aplicação **Projeto Desbravadores**, desenvolvido com:

- ✅ .NET 8
- ✅ ASP.NET Core Web API
- ✅ Clean Architecture
- ✅ JWT Authentication
- ✅ Docker
- ✅ GitHub Actions (CI)

---

## 🏗 Arquitetura

O projeto segue os princípios de **Clean Architecture**, dividido em camadas:

backend.dotnet/
│
├── projeto.desbravadores.Api → Camada de apresentação (Controllers)
├── projeto.desbravadores.Application → Regras de aplicação / Use Cases
├── projeto.desbravadores.Domain → Entidades e regras de negócio
├── projeto.desbravadores.Infrastructure → Implementações (JWT, Repositórios, etc.)
└── projeto.desbravadores.sln
