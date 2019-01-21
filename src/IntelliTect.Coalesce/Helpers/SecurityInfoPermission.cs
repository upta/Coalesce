using IntelliTect.Coalesce.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IntelliTect.Coalesce.Helpers
{
    public class SecurityPermission
    {

        public SecurityPermission()
        {
            HasAttribute = false;
        }

        public SecurityPermission(SecurityPermissionLevels level, string roles, string name)
        {
            HasAttribute = true;
            PermissionLevel = level;
            Roles = PermissionLevel != SecurityPermissionLevels.DenyAll ? roles : string.Empty;
            Name = name;
        }

        public bool HasAttribute { get; }
        public SecurityPermissionLevels PermissionLevel { get; } = SecurityPermissionLevels.AllowAuthorized;
        public string Roles { get; } = "";
        public string Name { get; } = "";
                

        public bool AllowAnonymous => PermissionLevel == SecurityPermissionLevels.AllowAll;
        public bool NoAccess => PermissionLevel == SecurityPermissionLevels.DenyAll;
        public bool HasRoles => RoleList.Any();

        private IReadOnlyList<string> _roleList;

        public IReadOnlyList<string> RoleList
        {
            get
            {
                if (_roleList != null) return _roleList;

                var list = new List<string>();
                if (!string.IsNullOrEmpty(Roles))
                {
                    string[] roles = Roles.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    list.AddRange(roles.SelectMany(RoleMapping.Map).Union(roles).Distinct());
                }
                return _roleList = list.AsReadOnly();
            }
        }

        public string ExternalRoleList => string.Join(",", RoleList);

        public string ToStringWithName() => $"{Name}: {ToString()}";

        public override string ToString()
        {
            if (!HasAttribute)
            {
                return "Allow All Authorized";
            }

            switch (PermissionLevel)
            {
                case SecurityPermissionLevels.AllowAll:
                    return "Allow All ";
                case SecurityPermissionLevels.DenyAll:
                    return "Deny All ";
                default:
                    return $"Allow Authorized Roles: {ExternalRoleList} ";
            }
        }
    }
}