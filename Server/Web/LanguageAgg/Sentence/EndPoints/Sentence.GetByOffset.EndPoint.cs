using Application.Core.ByOffset;
using Application.LanguageAgg.Sentence.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Extensions;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Sentence.EndPoints;

[Route("/api/sentences")]
public class SentenceGetByOffsetEndPoint : KApiController
{
    public SentenceGetByOffsetEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet]
    public async Task<ApiRes<SentenceOffsetQuery.Response>> GetByOffset([FromQuery] Query query)
    {
        var result = await Mediator.Send(GenRequest(query));
        return result.GenOffsetResponse();
    }

    private static SentenceOffsetQuery.Request GenRequest(Query query)
    {
        var request = query.GenOffsetRequest<SentenceOffsetQuery.Request, KByOffsetFilter, KByOffsetOrderBy>();
        request.Type = query.Type;
        return request;
    }

    public class Query : IKByOffsetQuery<KByOffsetFilter, KByOffsetOrderBy>
    {
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetFilter> Filters { get; set; } = new List<KByOffsetFilter>();
        public List<KByOffsetOrderBy> Sort { get; set; } = new List<KByOffsetOrderBy>();
        public SentenceOffsetQuery.TypeDto? Type { get; set; }
    }
}