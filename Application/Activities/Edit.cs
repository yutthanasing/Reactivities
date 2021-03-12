using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Common : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handle : IRequestHandler<Common>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handle(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            async Task<Unit> IRequestHandler<Common, Unit>.Handle(Common request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                
                _mapper.Map(request.Activity,activity);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}