 =========================
defpage.com static server
=========================

Log directory
=============

Prepare log directory::

  # mkdir /var/log/defpage_static
  # chgrp staff /var/log/defpage_static

Deploy
======

Create virtual environment and deploy static within it::

  $ git clone git@spacta.com:defpage_static.git
  $ cd defpage_static
  $ virtualenv --no-static-packages --distribute .
  $ bin/pip install -e .

Run tests::

  $ bin/python setup.py test

Run static for development::

  $ bin/pserve development.ini --reload
