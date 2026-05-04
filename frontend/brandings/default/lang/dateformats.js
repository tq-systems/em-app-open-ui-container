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

export const dateFormats = {
  year: { year: 'numeric'},
  monthYear: { month: 'long', year: 'numeric' },
  monthShortYear: { month: 'short', year: 'numeric' },
  short: {
    year: 'numeric', month: '2-digit', day: '2-digit',
  },
  long: {
    year: 'numeric', month: 'long', day: '2-digit',
  },
  time: {
    hour: '2-digit', minute: '2-digit',
  },
  timeLTS: {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  },
  dateTime: {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  },
  dateTimeLongMonth: {
    year: 'numeric', month: 'long', day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  },
  dateTimeLTS: {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }
}
