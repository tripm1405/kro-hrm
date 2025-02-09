using Domain.Core.Entities;

namespace Domain.LanguageAgg;

public class TranslateEntity : IKIdEntity
{
    public Guid Id { get; set; }
    public string Code { get; set; }

    #region Ref

    public List<SentenceEntity> Sentences { get; set; }

    #endregion
}