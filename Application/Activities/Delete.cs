using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Common : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handle : IRequestHandler<Common, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;
            }

            async Task<Result<Unit>> IRequestHandler<Common, Result<Unit>>.Handle(Common request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                
                //if(activity == null) return null;
                
                _context.Activities.Remove(activity);

                var result = await _context.SaveChangesAsync()  > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}