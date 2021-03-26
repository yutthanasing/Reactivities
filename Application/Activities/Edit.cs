using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Common : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommonValidator : AbstractValidator<Common>
        {
            public CommonValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handle : IRequestHandler<Common, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handle(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            async Task<Result<Unit>> IRequestHandler<Common, Result<Unit>>.Handle(Common request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if(activity == null) return null;
                
                _mapper.Map(request.Activity,activity);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update activity");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}