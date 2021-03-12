using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Common : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handle : IRequestHandler<Common>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;
            }

            async Task<Unit> IRequestHandler<Common, Unit>.Handle(Common request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                
                _context.Activities.Remove(activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}