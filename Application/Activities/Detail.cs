using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Detail
    {
        public class Query : IRequest<Activity> { 
            public Guid Id { get; set; }
        }

        public class Handle : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;
            }

            async Task<Activity> IRequestHandler<Query, Activity>.Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}