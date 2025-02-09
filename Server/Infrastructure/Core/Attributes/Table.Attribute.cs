namespace Infrastructure.Core.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class TableAttribute : Attribute
{
    public string Name { get; private set; } = string.Empty;
    
    public TableAttribute()
    {
    }
    
    public TableAttribute(string name)
    {
        this.Name = name;
    }
}