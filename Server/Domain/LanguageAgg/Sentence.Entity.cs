using Domain.CategoryAgg;
using Domain.Core.Entities;

namespace Domain.LanguageAgg;

public class SentenceEntity : IKIdEntity
{
    public Guid Id { get; set; }
    public Guid RootId { get; set; }
    public Guid TypeId { get; set; }
    public string Content { get; set; }

    #region Ref
    
    public TranslateEntity Root { get; set; }
    public CategoryEntity Type { get; set; }

    #endregion
}