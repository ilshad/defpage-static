=====================
defpage static server
=====================

Deploy
======

Create virtual environment and deploy static within it::

  $ git clone git@github.com:astoon/defpage-static.git
  $ cd defpage_static
  $ virtualenv --no-static-packages --distribute .
  $ bin/pip install -e .

Run tests::

  $ bin/python setup.py test

Run static for development::

  $ bin/pserve development.ini --reload

test
