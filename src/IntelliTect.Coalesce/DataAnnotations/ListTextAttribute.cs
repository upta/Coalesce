﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntelliTect.Coalesce.DataAnnotations
{
    /// <summary>
    /// The property marked with the attribute will be shown in drop down lists.
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Property)]
    public class ListTextAttribute : System.Attribute
    {
    }
}
