using Application.LanguageAgg.Translate.DTOs;

namespace Application.LanguageAgg.Sentence.DTOs;

public class SentenceDto
{
    public Guid Id { get; set; }
    public Guid RootId { get; set; }
    public Guid TypeId { get; set; }
    public string Content { get; set; }
    public TranslateDto Root { get; set; }
}