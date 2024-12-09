import allowedRoles, { UserRole } from '@/data/allowedRoles';

export default function canPerformAction(actorRole: string, targetRole: string): boolean {
	// Get the index of the roles in the allowedRoles array
	const actorIndex = allowedRoles.indexOf(actorRole as UserRole);
	const targetIndex = allowedRoles.indexOf(targetRole as UserRole);

	// If either role is not found in the allowedRoles array, return false
	if (actorIndex === -1 || targetIndex === -1) {
		return false;
	}

	// Action is allowed if the actor's role index is less than or equal to the target's role index
	return actorIndex < targetIndex;
}
