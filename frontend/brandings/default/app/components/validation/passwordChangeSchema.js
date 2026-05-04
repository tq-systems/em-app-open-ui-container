/*
 * Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld,
 * Germany. All rights reserved.
 * Author: Ronny Freyer and the Energy Manager development team
 *
 * This software is licensed under the TQ-Systems Product Software License
 * Agreement Version 1.0.3 or any later version.
 * You can obtain a copy of the License Agreement in the TQS (TQ-Systems
 * Software Licenses) folder on the following website:
 * https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
 * In case of any license issues please contact license@tq-group.com.
 */

import { z } from 'zod'

export const passwordChangeSchema = z.object({
  newPassword: z.string()
    // mindestens 12 Zeichen
    .min(12, 'validation.messages.min_lenght')
    // mindestens ein Großbuchstabe
    .refine(val => /[A-Z]/.test(val), 'validation.messages.contains_uppercase')
    // mindestens ein Kleinbuchstabe
    .refine(val => /[a-z]/.test(val), 'validation.messages.contains_lowercase')
    // mindestens eine Zahl
    .refine(val => /[0-9]/.test(val), 'validation.messages.contains_numerals'),
})
