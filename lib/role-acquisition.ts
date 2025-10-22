// Role acquisition triggers and logic

export interface UserRoles {
  isProspect: boolean;
  isTenant: boolean;
  isLandlord: boolean;
}

export const roleAcquisition = {
  // Trigger landlord role when user creates a property
  acquireLandlordRole(currentRoles: UserRoles): UserRoles {
    return {
      ...currentRoles,
      isLandlord: true,
      // Note: User remains a prospect and can also become a tenant
    };
  },

  // Trigger tenant role when user signs a lease
  acquireTenantRole(currentRoles: UserRoles): UserRoles {
    return {
      ...currentRoles,
      isTenant: true,
      // Note: User remains a prospect and can also become a landlord
    };
  },

  // Check if user can perform landlord actions
  canManageProperties(roles: UserRoles): boolean {
    return roles.isLandlord;
  },

  // Check if user can perform tenant actions
  canManageRentals(roles: UserRoles): boolean {
    return roles.isTenant;
  },

  // Get all active roles for UI display
  getActiveRoles(roles: UserRoles): string[] {
    const activeRoles: string[] = [];
    if (roles.isProspect) activeRoles.push('Prospect');
    if (roles.isTenant) activeRoles.push('Tenant');
    if (roles.isLandlord) activeRoles.push('Landlord');
    return activeRoles;
  },

  // Check if user has multiple roles
  hasMultipleRoles(roles: UserRoles): boolean {
    return (roles.isTenant ? 1 : 0) + (roles.isLandlord ? 1 : 0) > 1;
  },
};
