import React from 'react';

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    accent_color: string | null;
    avatar_decoration_data: string | null;
    banner: string | null;
    banner_color: string | null;
    clan: string | null;
    discriminator: string;
    flags: number;
    global_name: string;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    public_flags: number;
    verified: boolean;
  }
  