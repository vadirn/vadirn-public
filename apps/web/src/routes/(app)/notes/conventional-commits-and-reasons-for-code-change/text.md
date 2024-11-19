Systems often degrade over time due to factors like changing requirements, quick fixes, and accumulating technical debt. These factors align with the four reasons for code change that M. Feathers outlines in his book "Working Effectively with Legacy Code."

- **Fixing bugs**. Constantly fixing bugs is both a sign and a cause of system decay.
- **Adding features**. Adding each new feature makes the system more complex. This can introduce new bugs or make the codebase harder to maintain.
- **Improving the design**. Design improvements are often a response to previous changes, like hasty bug fixes or poorly integrated new features. On the other hand, proactive design improvements can prevent future issues.
- **Optimizing resource usage**. As the codebase grows and becomes more complex, resource usage may become less efficient, leading to decreased performance.

Unfortunately, changes made to address system decay can sometimes cause more issues themselves, leading to the need for further changes later on.

Feathers suggests that by addressing these four reasons for code change in a disciplined, test-driven way, developers can slow or even reverse the tendency of systems to degrade over time. A disciplined, test-driven approach involves writing tests before implementing changes, ensuring that each modification is verified and doesn't introduce new issues.

Now that we understand the reasons for code changes, we can be more conscious of the impact by using specific prefixes defined by the "conventional commit" format:

| Reasons for Change                                     | Commit Prefix     |
| ------------------------------------------------------ | ----------------- |
| Fixing bugs.                                           | fix/hotfix/revert |
| Adding features.                                       | feat              |
| Improving the design.                                  | chore             |
| Improving the performance (Optimizing resource usage). | chore             |

If choosing a prefix is challenging, I find it helpful to check the change scope and maybe split the commit into multiple ones:

| Change Scope                                                                                                       | Commit Prefix     |
| ------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Corrects existing behavior to the expected one. Doesn't matter user-facing or not.                                 | fix/hotfix/revert |
| Anything that doesn't directly change the behavior expected by the end user (design and performance improvements). | chore             |
| Everything else.                                                                                                   | feat              |

If the scope remains unclear after this check, it likely indicates that the commit consists of too many changes. In such cases, it's beneficial to split it into multiple smaller, more focused commits. This practice enhances code review processes and allows for more granular tracking of changes.

For example, adding i18n to a project would typically be considered a "feat". Indeed it adds a new user-facing behavior to the product. However, the implementation involves a few "chore" changes, such as:
- setting up the i18n library or framework
- refactoring existing code to support i18n

If you're using merge commits, I'd suggest having at least 2 separate PRs in this case:
- "chore: i18n library and translation keys"
- "feat: lang switcher and XX translation"

This separation allows for easier code review and potential rollback of specific changes if needed. It also helps in isolating the setup and infrastructure changes from the actual feature implementation.

Using the relationship between conventional commit prefixes and reasons for code change helps teams track and understand their impact on the system. This visibility can highlight areas that may need more attention to prevent degradation, such as an increase in bug fixes or a lack of design improvements. 

This approach also communicates the importance of system maintenance to business stakeholders. By providing clear, categorized evidence of system evolution, development teams can better explain the need for resource allocation to maintenance tasks. This data-driven method shows how proactive maintenance supports long-term system health, potentially reducing future costs and improving product quality. Consequently, aligning technical priorities with business objectives becomes easier, fostering a shared understanding of the value of continuous system improvement.