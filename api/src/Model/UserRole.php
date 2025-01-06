<?php

namespace App\Model;

enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';
    case MODERATOR = 'moderator';
}
