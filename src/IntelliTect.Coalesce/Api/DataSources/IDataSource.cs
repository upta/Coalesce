using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IntelliTect.Coalesce.Models;

namespace IntelliTect.Coalesce
{
    public delegate IQueryable<T> SelectPropertiesFunction<T>(IQueryable<T> query);

    public interface IDataSource<T>
        where T : class, new()
    {
        Task<(ItemResult<T> Item, IncludeTree IncludeTree)> GetItemAsync(object id, IDataSourceParameters parameters);

        Task<ItemResult<TDto>> GetMappedItemAsync<TDto>(object id, IDataSourceParameters parameters)
            where TDto : IClassDto<T>, new();

        Task<(ListResult<T> List, IncludeTree IncludeTree)> GetListAsync(IListParameters parameters);

        Task<ListResult<TDto>> GetMappedListAsync<TDto>(IListParameters parameters)
            where TDto : IClassDto<T>, new();

        Task<ItemResult<int>> GetCountAsync(IFilterParameters parameters);

        /// <summary>
        /// List of properties to select from the database. Allows for setting these at runtime.
        /// </summary>
        SelectPropertiesFunction<T> SelectPropertiesFunction { get; set; }

    }
}