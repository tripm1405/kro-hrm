using Domain.LanguageAgg;
using Infrastructure.Core.Repositories;

namespace Infrastructure.LanguageAgg;

public class TranslateRepo : KRepository<TranslateEntity>, ITranslateRepo
{
    public TranslateRepo(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }
}