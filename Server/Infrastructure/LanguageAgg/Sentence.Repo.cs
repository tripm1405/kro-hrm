using Domain.LanguageAgg;
using Infrastructure.Core.Repositories;

namespace Infrastructure.LanguageAgg;

public class SentenceRepo : KRepository<SentenceEntity>, ISentenceRepo
{
    public SentenceRepo(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }
}