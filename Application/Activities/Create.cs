using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
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
            public Handle(DataContext context)
            {
                _context = context;
            }

            async Task<Result<Unit>> IRequestHandler<Common, Result<Unit>>.Handle(Common request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}