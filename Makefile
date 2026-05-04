#
# Copyright (c) 2025-2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
# Author: Ronny Freyer and the Energy Manager development team
#
# This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
# You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
# https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
# In case of any license issues please contact license@tq-group.com.
#

# set empty backend build tool
BACKEND_BUILD =

PKG_ARCH = all

APP_PRETTY_NAME = UI Container
DESCRIPTION = The web container for all apps.

export VITE_BUILD_VARIANT = default

include /opt/energy-manager/apps/Makefile

yarn-release:
	cd frontend && yarn exec vite build --config node_modules/@tq-systems/em-ui-core/config/vite.buildProd.js
