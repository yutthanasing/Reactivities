using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handle : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handle(DataContext context)
            {
                _context = context;
            }

            async Task<List<Activity>> IRequestHandler<Query, List<Activity>>.Handle(Query request, CancellationToken cancellationToken)
            {               
                return await _context.Activities.ToListAsync();
            }
        }

    }
}