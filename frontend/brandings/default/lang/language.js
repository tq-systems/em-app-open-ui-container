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

import de from './de.json'
import en from './en.json'
import { fractionDigits } from './numberformats.js'
import { dateFormats } from './dateformats.js'

export const labels = {
    en: 'English',
    de: 'Deutsch',
}

export const messages = {
    en,
    de,
}

// Generate numberFormats from available languages
export const numberFormats = {}
for (const langkey in messages) { numberFormats[langkey] = fractionDigits }

// Generate datetimeFormats from available languages
export const datetimeFormats = {}
for (const langkey in messages) { datetimeFormats[langkey] = dateFormats }
