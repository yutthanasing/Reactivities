using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Common : IRequest
        {
            public Activity Activity { get; set; }
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
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}