using Application.LanguageAgg.Sentence.DTOs;

namespace Application.LanguageAgg.Translate.DTOs;

public class TranslateDetailDto
{
    public Guid Id { get; set; }
    public string Code { get; set; }
    public List<SentenceDto> Sentences { get; set; }
}