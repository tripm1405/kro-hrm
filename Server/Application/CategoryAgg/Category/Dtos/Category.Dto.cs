namespace Application.CategoryAgg.Category.Dtos;

public class CategoryDto
{
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid? RootId { get; set; }
    public bool IsDefault { get; set; }
    public int Index { get; set; }
}