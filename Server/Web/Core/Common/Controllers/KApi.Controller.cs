using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Core.Controllers;

[ApiController]
public abstract class KApiController : ControllerBase
{
    protected readonly IMediator Mediator;

    protected KApiController(IMediator mediator)
    {
        Mediator = mediator;
    }
}